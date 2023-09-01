AFRAME.registerComponent("create=markers",{
    init: async function () {
        var main_scene = document.querySelector("mainScene")
        var dishes = await this.getDishes();
        dishes.map(dish=>{
            var marker = document.createElement("a-marker")
            marker.setAttribute("id", dish.id)
            marker.setAttribute("type","pattern")
            marker.setAttribute("url", dish.marker_pattern_url)
            marker.setAttribute("cursor",{rayOrigin:"mouse"})
            marker.setAttribute("marker-handler",{})
            main_scene.appendChild(marker)

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

            if (!dish.unavailable_days.includes(days[day])) {
            var model = document.createElement("a-entity")
            model.setAttribute("id", `model-${dish,id}`)
            model.setAttribute("position", dish.model_geometry.position)
            model.setAttribute("rotation", dish.model_geometry.rotation)
            model.setAttribute("scale", dish.model_geometry.scale)
            model.setAttribute("gltf-model", `url(${dish.model_url})`)
            model.setAttribute("gesture-handler", {})
            marker.appendChild(model)

            var mainPlane = document.createElement("a-plane")
            mainPlane.setAttribute("id", `mP-${dish.id}`)
            mainPlane.setAttribute("position",{x:0, y:0, z:0})
            mainPlane.setAttribute("rotation", {x:-90,y:0,z:0})
            mainPlane.setAttribute("width", 1.7)
            mainPlane.setAttribute("height",1.5)
            marker.appendChild(marker)

            var titlePlane = document.createElement("a-plane")
            titlePlane.setAttribute("id", `tP-${dish.id}`)
            titlePlane.setAttribute("position",{x:0, y:0.9, z:0.02})
            titlePlane.setAttribute("rotation", {x:0,y:0,z:0})
            titlePlane.setAttribute("width", 1.6)
            titlePlane.setAttribute("height",0.5)
            titlePlane.setAttribute("material",{color:"blue"})
            mainPlane.appendChild(titlePlane)

            var dishTitle = document.createElement("a-entity")
            dishTitle.setAttribute("id", `dt-${dish.id}`)
            dishTitle.setAttribute("position",{x:0, y:0, z:0.1})
            dishTitle.setAttribute("rotation", {x:0,y:0,z:0})
            dishTitle.setAttribute("width", 1.7)
            dishTitle.setAttribute("height",1.5)
            dishTitle.setAttribute("text",{
                font:"monoid",
                color:"yellow",
                width:1.5,
                height:1,
                align:"center",
                value: dish.dish_name.toUpperCase()
            })
            titlePlane.appendChild(dishTitle)

            var ingList = document.createElement("a-entity")
            ingList.setAttribute("id", `IL-${dish.id}`)
            ingList.setAttribute("position",{x:0.3, y:0, z:0.1})
            ingList.setAttribute("rotation", {x:0,y:0,z:0})
            ingList.setAttribute("text",{
                font:"monoid",
                color:"yellow",
                width:1.5,
                height:1,
                align:"center",
                value: `${dish.ingredients.join("\n\n")}`
            })
            mainPlane.appendChild(ingList)

            var pricePlane = document.createElement("a-image")
            pricePlane.setAttribute("id", `price-${dish.id}`)
            pricePlane.setAttribute("position",{x:-1.3, y:0, z:0.3})
            pricePlane.setAttribute("rotation", {x:-90,y:0,z:0})
            pricePlane.setAttribute("visible", false)
            pricePlane.setAttribute("width", 0.8)
            pricePlane.setAttribute("height", 0.8)
            pricePlane.setAttribute("src", "https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png")

            var price = document.createElement("a-entity")
            price.setAttribute("id", `Price1-${dish.id}`)
            price.setAttribute("position",{x:0.03,y:0.05,z:0.1})
            price.setAttribute("rotation",{x:0,y:0,z:0})
            price.setAttribute("text",{
                font:"monoid",
                color:"white",
                width:3,
                align:"center",
                value:`Only\n${dish.price}`

            })
            pricePlane.appendChild(price)
            marker.appendChild(pricePlane)
        }

        })
    },
    getDishes: async function(){
        return await firebase
        .firestore()
        .collection("dishes")
        .get()
        .then(snap=>{return snap.docs.map(doc=>doc.data())})
    }
})