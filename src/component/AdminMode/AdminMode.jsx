import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function AdminMode() {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex gap-5 justify-center items-center">
            <Button onClick={() => navigate("/admin-mode/series-form")}>Add Series</Button>
            <Button onClick={() => navigate("/admin-mode/match-form")}>Add Matches</Button>
            <Button>Add Players</Button>
            <Button>Add Teams</Button>
        </div>
    );
}