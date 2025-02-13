import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { useSession } from "next-auth/client";
import React, { useState } from "react";
import { AddAttachments } from "./../common-props/add-attachment";

export const Addphd = ({ handleClose, modal }) => {
  const [session, loading] = useSession();
  const [content, setContent] = useState({
    phd_student_name: "",
    thesis_topic: "",
    start_year: "",
    completion_year:"",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
    //console.log(content)
  };

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    let data = {
      ...content,
      id: Date.now(),
      email: session.user.email,
    };
    // data.attachments = JSON.stringify(data.attachments);

    let result = await fetch("/api/create/phdcandidates", {
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
            Add PhD Student
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="label"
              label="PhD Student"
              name="phd_student_name"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.phd_student_name}
            />
              <TextField
              margin="dense"
              id="label"
              label="thesis_topic"
              name="thesis_topic"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.thesis_topic}
            />
              <TextField
              margin="dense"
              id="label"
              label="start_year"
              name="start_year"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.start_year}
            />
              <TextField
              margin="dense"
              id="label"
              label="completion_year"
              name="completion_year"
              type="text"
              required
              fullWidth
              onChange={(e) => handleChange(e)}
              value={content.completion_year}
            />
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
