import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

export const AddCurrent = ({ handleClose, modal }) => {
  const [session, loading] = useSession();
  const [content, setContent] = useState({
    curr_responsibility: "",
    start: undefined,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    //console.log(content)
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    // let start = new Date(content.start);
    // start = start.getTime();
    let data = {
      ...content,
      id: Date.now(),
      email: session.user.email,
    };
    // data.attachments = JSON.stringify(data.attachments);

    let result = await fetch("/api/create/current-responsibility", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    result = await result.json();
    if (result instanceof Error) {
      console.log("Error Occured");
      console.log(result);
    }
    console.log(result);
    window.location.reload();
  };

  return (
    <>
      <Dialog open={modal} onClose={handleClose}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <DialogTitle disableTypography style={{ fontSize: `2rem` }}>
            Add Current Admin Responsibility
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="label"
              label="Current Admin Responsibility"
              name="curr_responsibility"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.curr_responsibility}
            />
            <TextField
              margin="dense"
              id="label"
              label="Start Date"
              name="start"
              type="text"
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.start}
            />
            {/* <TextField
              margin="dense"
              id="labelstart"
              label="Start Date"
              name="start"
              type="date"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.start}
              InputLabelProps={{
                shrink: true,
              }}
            /> */}
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="flex-start">
                <DatePicker
                  openTo="year"
                  name="start"
                  format="MM/yyyy"
                  views={["year", "month"]}
                  label="Start-Date"
                  value={content.start}
                  onChange={(e) => setContent({ ...content, start: e })}
                />
              </Grid>
            </MuiPickersUtilsProvider> */}
          </DialogContent>
          <DialogActions>
            {submitting ? (
              <Button type="submit" color="primary" disabled>
                Submitting
              </Button>
            ) : (
              <Button type="submit" color="primary">
                Submit
              </Button>
            )}
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
