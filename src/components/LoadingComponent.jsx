import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingComponent = () => {
  return (
    <div>
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <CircularProgress
            size={150}
            style={{ textAlign: "center", marginTop: "15%" }}
          />
          <p style={{ textAlign: "center", marginTop: "3%" }}>
            Loadig...Please wait
          </p>
        </div>
      </Dialog>
    </div>
  );
};
export default LoadingComponent;
