setInterval(() => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const payload = JSON.stringify({
    prompt: "Today's date",
    type: "query",
    docId: "67054feb-4c9e-434f-9f56-343434",
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: payload,
  };

  fetch(
    "https://us-central1-brand-luminaire.cloudfunctions.net/fetchDataFromChatGPTWeb",
    requestOptions
  )
    .then((response) => {
      if (response.ok) {
        addRemoteStatus("success");
      } else {
        addRemoteStatus("error");
      }
    })
    .catch((error) => {
      addRemoteStatus("error");
    });
}, 1 * 1000 * 60 * 60);

function addRemoteStatus(status) {
  Promise.all([
    fetch(
      "https://brand-luminaire-default-rtdb.firebaseio.com/remote_machine.json",
      {
        method: "PUT",
        body: JSON.stringify({
          status,
          last_checked: new Date().toLocaleString(undefined, {
            timeZone: "Asia/Kolkata",
          }),
        }),
      }
    ),
    fetch(
      "https://brand-luminaire-prod-default-rtdb.firebaseio.com/remote_machine.json",
      {
        method: "PUT",
        body: JSON.stringify({
          status,
          last_checked: new Date().toLocaleString(undefined, {
            timeZone: "Asia/Kolkata",
          }),
        }),
      }
    ),
  ]);
}
