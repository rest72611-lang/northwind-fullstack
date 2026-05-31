import { ChangeEvent, useState } from "react";
import { ragService } from "../../../Services/RagService";
import { notify } from "../../../Utils/Notify";
import { Spinner } from "../../SharedArea/Spinner/Spinner";
import "./Rag.css";

export function Rag() {

    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [fetching, setFetching] = useState<boolean>(false);

    function handleChange(args: ChangeEvent<HTMLInputElement>) {
        const value = args.target.value;
        setQuestion(value);
    }

    async function send() {
        try {
            setFetching(true);
            const answer = await ragService.ask(question);
            setAnswer(answer);
            setFetching(false);
        }
        catch (err: any) {
            notify.error(err);
            setFetching(false);
        }
    }

    return (
        <div className="Rag">

            <h2>Ask AI anything about our knowledge-base</h2>

            <label>Enter your question: </label>
            <br />

            <input type="text" onChange={handleChange} value={question} />
            <button onClick={send}>Send</button>
            <hr />

            <div>

                {fetching && <Spinner />}

                {!fetching && answer}

            </div>

        </div>
    );
}
