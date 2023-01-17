import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import PrivateLayout from "../../Layout";
import PreviewModal from "../../Content/PreviewDialog";
import { getKy } from "../../../helpers/ky";
import shortUUID from "short-uuid";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectGatewayUrl } from "../../../store/selectors/authSelectors";
import { Formik, Form, FormikHelpers } from "formik";
import { Customizations, UnlockInfo } from "../../../types/UnlockInfo";
import { useRouter } from "next/router";
import { setAlert } from "../../../store/slices/alertSlice";
import MainLandingContent from "../../Content/MainLandingContent";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import * as Yup from "yup";
import { AlertType } from "../../Alert";

interface SubmarineProps {
  children: ReactNode;
  unlockInfo: UnlockInfo;
  unlockInfoSchema: Yup.ObjectSchema<any>;
}

export interface MetadataUnlockInfo {
  name: string;
  description: string;
  unlockInfo: UnlockInfo;
  thumbnail?: string;
  customizations: Customizations | null;
  submarineCID: string;
  shortId: string;
}

const SubmarineFileForm = ({ children, unlockInfoSchema, unlockInfo }: SubmarineProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const gatewayUrl = useAppSelector(selectGatewayUrl);

  const baseInitialValues = {
    name: "",
    description: "",
    thumbnail: "",
    customizations: {},
    submarineCID: "",
    shortId: "",
  };
  const [initialValues, setInitialValues] = useState<MetadataUnlockInfo>({
    unlockInfo,
    ...baseInitialValues,
  });
  const [isInitialValid, setIsInitialValid] = useState(false);

  const SubmarineFormSchema = Yup.object().shape({
    unlockInfo: unlockInfoSchema,
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    thumbnail: Yup.string()
      .nullable()
      .test(
        "Thumbnail is being uploaded",
        "Thumbnail is being uploaded",
        (value) => !value || !value.includes("blob:")
      ),
    customizations: Yup.object(),
    submarineCID: Yup.string().required("Required"),
    shortId: Yup.string().required("Required"),
  });
  const { edit } = router.query;
  useEffect(() => {
    if (router.query && edit) {
      const ky = getKy();
      ky(`/api/content/${edit}`).then((res) =>
        res.json().then((json) => {
          setIsInitialValid(true);
          const initialValues = {
            unlockInfo: json.unlockInfo,
            name: json.name,
            description: json.description,
            thumbnail: json.thumbnail,
            customizations: json.customizations,
            submarineCID: json.submarineCID,
            shortId: json.shortId,
          };
          setInitialValues(initialValues);
        })
      );
    }
  }, [router.query, edit]);
  const onSubmit = async (
    values: MetadataUnlockInfo,
    { setSubmitting }: FormikHelpers<MetadataUnlockInfo>
  ) => {
    setSubmitting(true);
    values.shortId = values.shortId || shortUUID.generate();

    const submarinedContent: MetadataUnlockInfo = {
      ...values,
    };

    const ky = getKy();
    await ky(`/api/metadata`, {
      method: edit ? "PUT" : "POST",
      json: submarinedContent,
      timeout: false,
    })
      .then(() => {
        router.push("/");
        dispatch(
          setAlert({
            type: AlertType.Info,
            message: "Created locked content!",
          })
        );
      })
      .catch(() => {
        dispatch(
          setAlert({
            type: AlertType.Error,
            message: "Failed to create locked content!",
          })
        );
      });
    setSubmitting(false);
  };

  return (
    <PrivateLayout>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={onSubmit}
        validationSchema={SubmarineFormSchema}
        isInitialValid={isInitialValid}
      >
        {(props) =>
          props.isSubmitting ? (
            <Container sx={{ textAlign: "center", padding: 4, marginBottom: 10 }}>
              <Typography variant={"h3"} sx={{ marginBottom: 5 }}>
                Please wait
              </Typography>
              <CircularProgress size={100} />
            </Container>
          ) : (
            <Unstable_Grid2 container direction="column">
              <Unstable_Grid2
                container
                justifyContent={"space-between"}
                sx={{ margin: (theme) => theme.spacing(2), alignItems: "center" }}
              >
                <Link passHref href="/">
                  <Box height={"2rem"} width={"2rem"} sx={{ cursor: "pointer" }}>
                    <ArrowLeftIcon />
                  </Box>
                </Link>
                <Box
                  sx={{
                    display: { xs: "block", lg: "none" },
                  }}
                >
                  <Button onClick={() => setPreviewOpen(true)}>Preview</Button>
                </Box>
                <PreviewModal
                  previewOpen={previewOpen}
                  setPreviewOpen={setPreviewOpen}
                  fileInfo={props.values}
                />
              </Unstable_Grid2>
              <Unstable_Grid2 container sx={{ marginTop: (theme) => theme.spacing(2) }}>
                <Unstable_Grid2 lg={6} xs={12}>
                  <Form>{children}</Form>
                </Unstable_Grid2>
                <Unstable_Grid2
                  lg={6}
                  sx={{
                    padding: (theme) => theme.spacing(0, 2, 0, 2),
                    display: { lg: "flex", xs: "none" },
                    height: "90%",
                    position: "sticky",
                    top: "4.5em",
                    alignSelf: "flex-start",
                  }}
                >
                  <MainLandingContent fileInfo={props.values} gatewayUrl={gatewayUrl} isPreview />
                </Unstable_Grid2>
              </Unstable_Grid2>
              <Unstable_Grid2 container xs={12}>
                <Unstable_Grid2 lgOffset={4}>
                  <Box sx={{ padding: (theme) => theme.spacing(2, 0, 2, 0) }}>
                    <Button
                      sx={{
                        "&:hover": {
                          backgroundColor: (theme) => theme.palette.primary.main,
                          color: (theme) => theme.palette.primary.contrastText,
                        },
                      }}
                      type="submit"
                      onClick={(e) => props.handleSubmit()}
                      disabled={!props.isValid || props.isSubmitting}
                    >
                      {props.isSubmitting ? "Processing..." : "Upload and Continue"}
                    </Button>
                  </Box>
                </Unstable_Grid2>
              </Unstable_Grid2>
            </Unstable_Grid2>
          )
        }
      </Formik>
    </PrivateLayout>
  );
};

export default SubmarineFileForm;
