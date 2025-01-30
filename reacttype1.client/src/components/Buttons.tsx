import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const SubmitButton = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap gap-2"  >
            <Button outline color="Default" type="submit" >Submit</Button>
            <Button outline color="Default" onClick={() => navigate(-1)}>Go back to list</Button>
        </div>
    );
};

export const DeleteButton = ({ DeleteItem }: ButtonProps) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap gap-2" >
            <Button outline color="Default" onClick={DeleteItem}>Delete Record</Button>
            <Button outline color="Default" onClick={() => navigate(-1)}>Go back to list</Button>
        </div>
    );
};

export const ReturnButton = ({ Back }: ReturnProps) => {
    return (
        <div className="flex flex-wrap gap-2" >
            <Button outline color="Default" type="submit" >Submit</Button>
            <Button outline color="Default" onClick={() => Back()}>Go back to list</Button>
        </div>
    );
};



export default SubmitButton;

interface ButtonProps {
    DeleteItem: () => void;
}

interface ReturnProps {
    Back: () => void;
}
