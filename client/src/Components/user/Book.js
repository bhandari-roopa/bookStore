import Axios from "axios";
import React from "react";
// import domain from "../../util/domain";
import { makeStyles } from "@material-ui/core/styles";
import {
    Card,
    CardContent,
    Typography,
    CardHeader,
    Button,
    CardActions
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
    column: {
        float: "left",
        width: "30%",
        height: "30%",
        padding: "0 10px",
    },

    row: { margin: "0 -5px" },
    card: {
        marginTop:"10px",
        // height:"15rem",
        shadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        padding: "10px",
        background: "#f1f1f1",
        overflow:"auto"
    }
}));

export default function Book({ book, getBooks, editBook }) {
    async function deleteBook() {
        if (window.confirm("Do you want to delete this Book?")) {
            await Axios.delete(`http://localhost:3001/book/${book._id}`);

            getBooks();
        }
    }
    const classes = useStyles();
    return (
        <div className={classes.row}>
            <div className={classes.column}>
                <Card className={classes.card}>
                    <CardHeader
                        title={book.title} />
                    <CardContent>
                        <Typography variant="h6" gutterBottom component="p">
                            {book.author}
                        </Typography>
                        <Typography variant="p" gutterBottom component="p">
                            {book.description}
                        </Typography>
                        </CardContent>
                    <CardActions>
                        <Button size="small" color="primary" onClick={() => editBook(book)}>
                            Edit</Button>
                        <Button size="small" color="primary" onClick={deleteBook}>
                            Delete </Button>
                    </CardActions>
                    
                </Card>
            </div>
        </div>
    );
}


