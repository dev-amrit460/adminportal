import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useSession } from "next-auth/client"
import React from "react"

export const ConfirmDelete = ({ handleClose, modal, id, del }) => {
  const [session, loading] = useSession()
  let data = {
    id: id,
    email: session.user.email
  }
  const deleteEvent = async () => {
    let result = await fetch(`/api/delete/${del}`, {
      method: "DELETE",
      body: JSON.stringify(data)
    })
    result = await result.json()
    if (result instanceof Error) {
      console.log("Error Occured")
      console.log(result)
    }
    console.log(result)

    window.location.reload()
  }

  return (
    <div>
      <Dialog open={modal} onClose={handleClose}>
        <DialogTitle id='alert-dialog-title'>
          {"Do you want to REMOVE ?"}
        </DialogTitle>

        <DialogActions>
          <Button
            variant='contained'
            onClick={() => deleteEvent()}
            color='secondary'
          >
            Delete
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
