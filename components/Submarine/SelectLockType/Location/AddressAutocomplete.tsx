import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { useFormikContext } from "formik";
import { MetadataUnlockInfo } from "../SubmarineFileForm";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }
  global.initMap = () => {};
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  place_id: string;
  structured_formatting: StructuredFormatting;
}

export default function AddressAutocomplete() {
  const { setFieldValue, values } = useFormikContext<MetadataUnlockInfo>();
  if (values.unlockInfo.type !== "location") {
    throw new Error("Invalid scenario");
  }
  const placeSelected = values.unlockInfo.place || null;
  const [value, setValue] = React.useState<PlaceType | null>(placeSelected);
  React.useEffect(() => {
    if (values.unlockInfo.type !== "location") {
      throw new Error("Invalid scenario");
    }
    const placeSelected = values.unlockInfo?.place;
    if (placeSelected) {
      setValue(placeSelected);
    }
  }, [values]);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  React.useEffect(() => {
    const cb = (res) => {
      const location = res.geometry.location;
      const lat = location.lat();
      const lng = location.lng();
      setFieldValue("unlockInfo.lat", lat);
      setFieldValue("unlockInfo.long", lng);
      setFieldValue("unlockInfo.place", value);
    };
    if (!value) {
      return;
    }
    const service = new (window as any).google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId: value.place_id }, cb);
  }, [value]);
  const fetch = React.useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <>
      <Autocomplete
        id="google-map-demo"
        sx={{ width: 300 }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option?.description || ""
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        noOptionsText="No locations"
        onChange={(event: any, newValue: PlaceType | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
        renderOption={(props, option) => {
          const matches = option?.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option?.structured_formatting.main_text,
            matches.map((match: any) => [match.offset, match.offset + match.length])
          );

          return (
            <li {...props}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid item sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}>
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" color="text.secondary">
                    {option?.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </>
  );
}
