import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { formatEpochTime } from "../features/format-time";
import { RootState } from "../store";
import ReplyForm from "../components/reply-form";
import { Reply } from "../types/types";

export function Article() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const articleId = parseInt(id || '0');

  const item = useSelector((state: RootState) =>
      state.articles.newsItems.find((news) => news.id === articleId),
  );

  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    if (item?.replies) {
      setReplies(item.replies);
    }
  }, [item?.replies]);

  if (!item) {
    return (
        <Container fluid className="mt-4">
          <Card>
            <Card.Header>News Not Found</Card.Header>
            <Card.Body>
              <p>The requested news item could not be found.</p>
            </Card.Body>
          </Card>
        </Container>
    );
  }

  const time = formatEpochTime(item.time);

  return (
      <Container fluid className="mt-4">
        <Card>
          <Card.Header as="h1">{item.title}</Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Published: {time}</Card.Subtitle>
            <Card.Text>By: {item.by}</Card.Text>
            <Row className="mt-3">
              <Col xs={12} className="mb-2">
                <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
              </Col>
              <Col xs={12} className="mb-4">
                <Card.Link href={item.url} target="_blank" rel="noopener noreferrer">
                  Go to the source to read more
                </Card.Link>
              </Col>
            </Row>
            <ReplyForm articleId={item.id} />
            {replies.length > 0 ? (
                <div className="comments-section mt-4">
                  <h5>Replies:</h5>
                  {replies.map((reply, index) => (
                      <Card key={index} className="mb-2">
                        <Card.Body>{reply.text}</Card.Body>
                      </Card>
                  ))}
                </div>
            ) : (
                <p>No replies yet.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
  );
}
