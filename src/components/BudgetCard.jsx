import { Stack, Button, Card, ProgressBar } from "react-bootstrap";
import { currencyFormatter } from "../utils";

function getProgressBarVariant(amount, maxAmount) {
    const ratio = amount / maxAmount;
    if (ratio < 0.5) return "primary"
    if (ratio < 0.75) return "warning"
    return "danger"

}

function BudgetCard(props) {

    const classNames = []
    if (props.amount > props.maxAmount) {
        classNames.push("bg-danger", "bg-opacity-10")
    } else if (props.gray) {
        classNames.push("bg-light")
    }

    return (
        <Card className={classNames}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-3" >{props.title}</div>
                    <div className="d-flex align-items-baseline ">
                        {currencyFormatter.format(props.amount)}
                        {props.maxAmount && (<span className="ms-1 text-muted fs-6">/ {currencyFormatter.format(props.maxAmount)}
                        </span>)}
                    </div>
                </Card.Title>
                {props.maxAmount && (
                <ProgressBar
                    className="rounded-pill mb-3"
                    variant={getProgressBarVariant(props.amount, props.maxAmount)}
                    min={0}
                    max={props.maxAmount}
                    now={props.amount}>
                </ProgressBar>)}
                <Stack className="d-flex justify-content-end mt-4" direction="horizontal" gap="2">
                    {!props.hide && (<Button onClick={props.openAddExpense} variant="outline-primary">Add expense</Button>)}
                    {!props.hide && (<Button onClick={()=>props.onViewExpenseClick()} variant="outline-secondary">View Expenses</Button>)}
                </Stack>
            </Card.Body>
        </Card>
    );
}

export default BudgetCard