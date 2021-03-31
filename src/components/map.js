import React from "react"
import "./map.css"

export function LeafletMap() {
  const mapRef = React.useRef(null)

  React.useEffect(() => {
    let isMounted = true
    if (!document.getElementById("leaflet.css")) {
      const styles = document.createElement("link")
      styles.id = "leaflet.css"
      styles.rel = "stylesheet"
      styles.type = "text/css"
      styles.media = "screen"
      styles.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
      styles.crossOrigin = "anonymous"
      document.getElementsByTagName("head")[0].appendChild(styles)
    }
    function onScriptLoad() {
      if (isMounted) {
        console.log("init map")
        const { L } = window
        mapRef.current = L.map("LeafletMap").setView([48.859, 2.347], 7)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current)
      }
    }
    if (!document.getElementById("leaflet.js")) {
      const script = document.createElement("script")
      script.id = "leaflet.js"
      script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
      script.crossOrigin = "anonymous"
      script.async = true
      document.getElementsByTagName("head")[0].appendChild(script)
      script.addEventListener("load", onScriptLoad)
    } else {
      onScriptLoad()
    }
    return () => {
      isMounted = false
      if (mapRef.current) {
        console.log("remove map")
        mapRef.current.remove()
      }
    }
  }, [])

  return <div id="LeafletMap"></div>
}
