
import { useState } from "react";
import { useForm } from "react-hook-form";
import Map from './Map'
import './Form.css';


const From = () => {
    //  שימוש בספריית בניית טופס
    let { register, handleSubmit, formState: { errors } } = useForm();
    // מערך לשמירת הכתובות שהתקבלו מהשרת
    const [searchResult, setSearchResult] = useState([]);
    // שמירת המיקום של הכתובת שנבחרה
    let [position, setPosition] = useState({
        lat: 51.505,
        lon: -0.09
    })

    // פונקציה בעת שליחת הטופס
    const save = (values) => {
        alert("Your details have been successfully saved 👍")
    }

    // פונקציה להשלמת כתובות מהשרת
    async function SearchAddress(e) {
        try {
            const result = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}&limit=5`)
            const data = await result.json()
            // עדכון המערך של שמירת הכתובות שהתקבלו מהשרת
            setSearchResult(data)
            console.log(data);
        }
        catch (err) {
            console.log(err.message)
        }
    }

    // פונקציה בעת בחירת כתובת אחת מתוך רשימת הכתובות 
    function choosePosition(e) {
        if (e.target.value != " 👀 look for option ") {
            const choosing = JSON.parse(e.target.value)
            // עדכון מיקום הכתובת באובייקט
            setPosition({ lat: choosing.lat, lon: choosing.lon })
        }
    }

    return (
        <>
            {/* הטופס */}
            <form onSubmit={handleSubmit(save)}>
                <div>
                    <input placeholder="UserName" {...register("UserName", {
                        required: { value: true, message: "This is a required field" },
                        minLength: { value: 2, message: "The name must contain at least 2 letters" }
                    })} type="text" />
                    {errors.UserName && <div style={{ color: "red" }}>{errors.UserName.message} </div>}
                </div>
                <div>
                    <input placeholder="Address" {...register("Address", {
                        required: { value: true, message: "This is a required field" },
                        minLength: { value: 1, message: "The address must contain at least 2 letters" }
                    })} type="text" onChange={SearchAddress} />
                    {errors.Address && <div style={{ color: "red" }}>{errors.Address.message} </div>}

                    {searchResult.length > 0 && <select name="" id="" style={{ width: "220px" }} {...register("selectedAddress")} onChange={choosePosition} >
                        <option value=" 👀 look for option " > 👀 look for option </option>
                        {/* מעבר על מערך הכתובות והצגתו בתוך תגיות לבחירה */}
                        {searchResult.map((search, index) => (
                            // שמירת הכתובת בערך כדי שנוכל בעת בחירה לשלוף את המיקום מהכתובת
                            <option value={JSON.stringify(search)} key={index}>
                                {search.display_name}
                            </option>
                        ))}
                    </select>}

                </div>
                <div>
                    <input placeholder="Phone" {...register("Phone", {
                        required: { value: true, message: "This is a required field" },
                        minLength: { value: 9, message: "The phone number must have at least 9 digits" },
                        maxLength: { value: 10, message: "The phone number cannot be more than 10 digits" }
                    })} type="text" />
                    {errors.Phone && <div style={{ color: "red" }}>{errors.Phone.message} </div>}
                </div>
                <div>
                    <input placeholder="Email" {...register("Email", {
                        required: { value: true, message: "This is a required field" }
                    })} type="text" />
                    {errors.Email && <div style={{ color: "red" }}>{errors.Email.message} </div>}
                </div>
                <div>
                    <input {...register("InternetConnection")} type="checkbox" /> <label htmlFor="">Internet connection</label>
                </div>
                <div>
                    <input {...register("Kitchen")} type="checkbox" /> <label htmlFor="">Kitchen</label>
                </div>
                <div>

                    <input  {...register("CoffeeMachine")} type="checkbox" /> <label htmlFor="">CoffeeMachine</label>
                </div>
                <div>
                    <input placeholder="Number of rooms" {...register("NumberOfRooms")} type="number" />ׁׁׁ
                </div>
                <div>
                    <input placeholder="Distance" {...register("Distance", {
                        required: { value: true, message: "This is a required field" },
                        minLength: { value: 1, message: "The phone number must have at least 1 number" },
                    })} type="number" />
                    ׁׁׁ {errors.Distance && <div style={{ color: "red" }}>{errors.Distance.message} </div>}
                </div>

                <input type="submit" />
            </form>
            {/*  הצגת קומפוננטת המפה ושליחת אובייקט מיקום הכתובת לקומפוננטה*/}
            <Map markAddress={position} />
        </>
    );
}

export default From;
