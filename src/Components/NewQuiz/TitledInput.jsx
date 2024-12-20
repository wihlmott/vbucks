import { IoSearch } from "react-icons/io5";
import Input from "../Inputs/Input";
import { db } from "../../database/databases";
import { useState } from "react";
import classes from "../Loading.module.css";

const TitledInput = ({
    title,
    message = false,
    long = false,
    value = false,
    find = false,
    type = "text",
    sendValue = () => {},
    returnSearch = () => {},
}) => {
    const [loading, setLoading] = useState(false);
    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = (await db.quiz_titles.list()).documents;
            returnSearch(response);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const styles = {
        title: {
            textTransform: "capitalize",
            fontWeight: "bold",
            margin: "16px 0 -4px 0",
        },
        searchIcon: {
            position: "relative",
            color: `rgba(${loading ? "255" : "0"},0,0,1)`,
        },
    };

    return (
        <div>
            <p style={styles.title}>{title.replaceAll("_", " ")}:</p>
            <Input
                type={type}
                placeholder={title}
                value={value ? value : ""}
                sendValue={sendValue}
                long={long}
            />
            {find && (
                <IoSearch
                    className={loading ? classes.element : ""}
                    style={styles.searchIcon}
                    onClick={handleSearch}
                />
            )}
            <p
                style={{
                    fontSize: ".85rem",
                    marginTop: "-4px",
                    color: "rgba(0,0,0,.7)",
                }}
            >
                {message}
            </p>
        </div>
    );
};

export default TitledInput;
