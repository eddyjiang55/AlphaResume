import PageComponent from "./pageComponent";

const ResumeRender = ({ markdownData }) => {

  return (
    <PageComponent pageIndex={1} content={markdownData} onElementClick={() => { }} />
  );
};

export default ResumeRender;