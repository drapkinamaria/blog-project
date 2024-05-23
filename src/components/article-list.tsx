import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { RootState } from "../store";

export default function ArticleList() {
  const navigate = useNavigate();

  const news = useSelector((state: RootState) => state.articles.newsItems);

  const sortedNews = news.slice().sort((a, b) => b.time - a.time);

  return (
    <Container className="mt-4">
      <h1>News</h1>
      {sortedNews.map((newsItem) => (
        <Row key={newsItem.id} className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title style={{ fontSize: "16px" }}>
                  {newsItem.title}
                </Card.Title>
                <Card.Text>
                  By: {newsItem.by}
                  <br />
                </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/article/${newsItem.id}`)}
                >
                  Read more
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
}
