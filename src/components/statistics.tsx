import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Statistics() {
  const { newsItems } = useSelector((state: RootState) => state.articles);

  const totalCharacters = newsItems.reduce(
    (sum, article) => sum + article.title.length,
    0,
  );

  const totalComments = newsItems.reduce(
    (sum, article) => sum + (article.replies ? article.replies.length : 0),
    0,
  );

  return (
    <div className="mt-4">
      <h2>Statistics</h2>
      <table className="table">
        <tbody>
          <tr>
            <td>Total Articles</td>
            <td>{newsItems.length}</td>
          </tr>
          <tr>
            <td>Total Characters in Titles</td>
            <td>{totalCharacters}</td>
          </tr>
          <tr>
            <td>Total Comments</td>
            <td>{totalComments}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
