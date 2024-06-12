import { useState, useEffect, useCallback, use } from "react";
import Card from "./resumeCard";
import CradLoading from "./resumeCardLoading";

const RecordsList = ({ resumeIdList, userPhoneNumber }) => {
  const itemsPerPage = 4;
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [idsToShow, setIdsToShow] = useState([]);
  const [loadingNum, setLoadingNum] = useState(0);

  useEffect(() => {
    console.log("resumeIdList changed")
    setCards(resumeIdList);
  }, [resumeIdList]);

  useEffect(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const idsToLoad = cards.slice(start, end).filter(id => !idsToShow.includes(id));
    setLoadingNum(idsToLoad.length);

    const loadIdsSequentially = (ids) => {
      ids.forEach((id, index) => {
        setTimeout(() => {
          setIdsToShow((prevIds) => [...prevIds, id]);
          setLoadingNum((prevNum) => prevNum - 1);
        }, index * 1000); // 1 second gap between each card render
      });
    };

    loadIdsSequentially(idsToLoad);
  }, [page, cards]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDelete = (id) => {
    setIdsToShow((prevIds) => prevIds.filter((cardId) => cardId !== id));
    setCards((prevCards) => prevCards.filter((cardId) => cardId !== id));
  };

  return (
    <>
      <div className="w-full grid grid-cols-4 gap-4">
        {idsToShow.map((id) => (
          <Card
            key={id}
            resumeId={id}
            userPhoneNumber={userPhoneNumber}
            deletefromCards={handleDelete}
          />
        ))}
        {loadingNum > 0 &&
          Array.from({ length: loadingNum }, (_, index) => (
            <CradLoading key={index} />
          ))}
      </div>
      <div className="w-full mt-8 flex items-center justify-center">
        {idsToShow.length < cards.length && (
          <button
            className="mx-auto px-6 py-3 font-normal text-lg text-alpha-blue rounded-lg bg-white border border-alpha-blue shadow-md"
            onClick={loadMore}
          >
            加载更多
          </button>
        )}
      </div>
    </>
  );
};

export default RecordsList;
