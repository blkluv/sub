import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getBillingHistory } from "../../store/legacy/billing/billing.actions";
import { BillingHistory as BillingHistoryInterface } from "../../store/legacy/billing/types";
import {
  CardContent,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Pagination,
} from "@mui/material";
import { makeDatePretty } from "../../helpers/makeDatePretty";

interface BillingHistoryProps {
  billingHistory: BillingHistoryInterface[];
  getBillingHistory: any;
  hasMore: boolean;
}

const BillingHistory = ({ billingHistory, getBillingHistory, hasMore }: BillingHistoryProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [startingBefore, setStartingBefore] = useState(0);
  const [paginationDirection, setPaginationDirection] = useState<"prev" | "next" | null>(null);
  const [loading, setLoading] = useState(false);
  const LIMIT = 5;

  useEffect(() => {
    getBillingHistory(LIMIT, 0, 0);
  }, []);

  const handlePageChange = (e: any, newPage: number) => {
    setLoading(true);
    if (newPage < currentPage) {
      setPaginationDirection("prev");
      const firstRecord = billingHistory[0];
      const record = firstRecord && firstRecord.id ? firstRecord.id : startingBefore;
      getBillingHistory(LIMIT, 0, record);
    } else {
      setPaginationDirection("next");
      const lastRecord = billingHistory[billingHistory.length - 1];
      if (lastRecord && lastRecord.id) {
        setStartingBefore(lastRecord.id);
      }
      getBillingHistory(LIMIT, lastRecord.id, 0);
    }
    setCurrentPage(newPage);
  };

  const formatTotal = (amount: number) => {
    return `$${(amount / 100).toFixed(2)}`;
  };
  const renderInvoice = (row: BillingHistoryInterface) => {
    return (
      <TableRow key={row.id}>
        <TableCell>{makeDatePretty(row.date * 1000)}</TableCell>
        <TableCell>{formatTotal(row.total)}</TableCell>
        <TableCell>
          <a
            style={{ marginRight: 10 }}
            href={row.invoiceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-eye"></i>
          </a>
          <a
            style={{ marginLeft: 10 }}
            href={row.invoicePdf}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="far fa-file-pdf"></i>
          </a>
        </TableCell>
      </TableRow>
    );
  };

  const getTo = (nextNum: number) => {
    return billingHistory.length === 5 ? billingHistory.length : nextNum - billingHistory.length;
  };

  useEffect(() => {
    setLoading(false);
  }, [billingHistory]);

  if (billingHistory?.length) {
    return (
      <Card className="m-0">
        <CardContent>
          <Typography variant="h6">Billing History</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell scope="col">Date</TableCell>
                <TableCell scope="col">Amount</TableCell>
                <TableCell scope="col"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{billingHistory.map((h) => renderInvoice(h))}</TableBody>
          </Table>
          <TablePagination
            count={-1}
            page={currentPage}
            onPageChange={handlePageChange}
            rowsPerPage={LIMIT}
            nextIconButtonProps={{
              disabled: loading || (paginationDirection === "next" && !hasMore),
            }}
            backIconButtonProps={{ disabled: loading || paginationDirection !== "next" }}
            sx={{
              "& .MuiTablePagination-selectLabel, & .MuiInputBase-root": {
                display: "none",
              },
            }}
            labelDisplayedRows={({ from, to, count }) => (!loading ? `${from}-${getTo(to)}` : "")}
            rowsPerPageOptions={[5]}
            component={"div"}
          />
        </CardContent>
      </Card>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => ({
  billingHistory: state?.billing?.billing_history,
  hasMore: state?.billing?.hasMore,
});

const mapDispatchToProps = {
  getBillingHistory: getBillingHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(BillingHistory);
