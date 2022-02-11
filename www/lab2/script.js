document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
        return;
    console.log(value);
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=b545ceab5f400c3f066fb28c8c7bbaef";
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json);
        });
});