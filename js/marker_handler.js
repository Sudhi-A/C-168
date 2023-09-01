var tableno = null
AFRAME.registerComponent("marker-handler",{
    init: async function(){
        if (tableno === null) {
            this.askTabelno();
        }
        var dishes = await this.getDishes();
        this.el.addEventListener("markerFound",()=>{
            console.log("Marker is found")
            if (tableno !== null) {
                var markerId = this.el.id
                this.handleMarkerFound(dishes,markerId)
            }
            
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("Marker is lost")
            this.handleMarkerLost()
        })
    },
    askTabelno:function () {
      swal({
        title: "Welcome to Hunger!",
        icon:"https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/hunger.png",
        content:{
            element:"input",
            attributes:{placeholder:"Type your Table no.",type:"number",min:1}
        },
        closeOnClickOutside:false,
    })
    .then(v1=>{tableno=v1})

    },
    handleMarkerFound: function(dishes,markerId){
        var todaysDate = new Date()
            var day = todaysDate.getDate()
            var days = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday"
            ]
        var buttondiv = document.getElementById("buttonDiv")
        buttondiv.style.display = "flex"
        var Ratingbutton = document.getElementById("rating_button")
        var Orderbutton = document.getElementById("ordering_button")
        var Summarybutton = document.getElementById("summary_button")

        Ratingbutton.addEventListener("click", function() {
            swal({icon:"success", title:"Your opinion has been registered!", text:"Thank you for the review, we value your opinion", })
        })
        Orderbutton.addEventListener("click", function() {
            swal({icon:"https://imgur.com/4NZ6uLY.jpg", title:"Your food has been ordered!", text:"Please enjoy your meal!"})
        })
        Summarybutton.addEventListener("click", function() {
            this.handleOrderSummary();
        })
        
    },
    handleMarkerLost: function(){
        var buttondiv = document.getElementById("buttonDiv")
        buttondiv.style.display = "none"

    },
    getDishes: async function(){
        return await firebase
        .firestore()
        .collection("dishes")
        .get()
        .then(snap=>{return snap.docs.map(doc=>doc.data())})
    },
    handleOrderSummary: async function() {
      var tno
      tno <= 9?(tno = `T0${tno}`):`T${tno}`
      var orderSummary = await this.getOrderSummary(tno)  
      var modalDiv = document.getElementById("modal-div")
      modalDiv.style.display="flex"
      var Table = document.getElementById("bill-table-body")
    },
    getOrderSummary: async function(tno){
        return await firebase()
        .firestore()
        .collection("Tables")
        .doc(tno)
        .get()
        .then(doc=>doc.data())
    }
})