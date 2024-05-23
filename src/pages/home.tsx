import ArticleList from "../components/article-list";
import Statistics from "../components/statistics";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function Home() {
  const isLoading = useSelector((state: RootState) => state.articles.isLoading);

  return (
    <div className="container mt-4">
      {isLoading ? (
        <div className="text-center">
          <span>Loading news...</span>
        </div>
      ) : (
        <>
          <ArticleList />
          <Statistics />
        </>
      )}
    </div>
  );
}
