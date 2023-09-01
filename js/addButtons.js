AFRAME.registerComponent("buttons",{
init:function(){
    var button1=document.createElement("button")
    button1.innerHTML = "Rate Us"
    button1.setAttribute("id", "rating_button")
    button1.setAttribute("class", "btn btn-warning")

    var button2 =document.createElement("button")
    button2.innerHTML = "Order Now"
    button2.setAttribute("id", "ordering_button")
    button2.setAttribute("class", "btn btn-warning")

    var button3 =document.createElement("button")
    button3.innerHTML = "Order Summary"
    button3.setAttribute("id", "summary_button")
    button3.setAttribute("class", "btn btn-warning")

    var div1 = document.getElementById("buttonDiv")
    div1.appendChild(button1) 
    div1.appendChild(button2)
    div1.appendChild(button3)
}
})