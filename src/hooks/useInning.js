import { useContext } from "react"
import { InningContext } from "../context/InningContext"

export const useInning = () => {
    const context = useContext(InningContext);

    if (context === undefined) {
        throw new Error("useInning() must be used inside an InningProvider");
    }
    
    return context;
}