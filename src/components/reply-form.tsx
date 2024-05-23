import {FormEvent, useState} from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, FormControl } from "react-bootstrap";
import { addReply } from "../store/action";
import {ReplyFormProps} from "../types/types";

export default function ReplyForm({ articleId }: ReplyFormProps) {
  const [reply, setReply] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (reply.trim()) {
      dispatch(
        addReply({
          articleId: articleId,
          reply: { text: reply, id: new Date().toISOString() },
        }),
      );
      setReply("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3">
        <FormControl
          as="textarea"
          placeholder="Add a reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required
        />
      </FormGroup>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
