
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // 导入 useRouter 钩子
import Navbar from '../components/Navbar';

const HomePage = () => {
  const router = useRouter(); // 使用 useRouter 钩子获取当前路由信息
  const buttons = [
    { name: "基础信息", path: "/fill-info-step1" },
    { name: "个人评价", path: "/fill-info-step2" },
    { name: "教育经历", path: "/fill-info-step3" },
    { name: "职业经历", path: "/fill-info-step4" },
    { name: "项目经历", path: "/fill-info-step5" },
    { name: "获奖与证书", path: "/fill-info-step6" },
    { name: "科研论文与知识产权", path: "/fill-info-step7" },
    { name: "技能", path: "/fill-info-step8" },
    { name: "语言", path: "/fill-info-step9" },
    { name: "结束", path: "/fill-info-step10" }
  ];

  return (
    <div>
      <Navbar />
      <div className="secondNavbar">
        {buttons.map((button) => (
          <Link key={button.name} href={button.path} passHref>
            <button className={router.pathname === button.path ? 'active' : ''}>
              {button.name}
            </button>
          </Link>
        ))}
      </div>
      <div className='background'>
      <div className="form-container">
          <div className="form-heading">
            <h2>教育经历</h2>
          </div>
          <div className="form-body">
            <form>
              <label>学历</label>
              <input type="tel" placeholder="请选择学历水平" />

              <label>学校名称</label>
              <input type="email" placeholder="请输入学校名称" />

              <label>微信号</label>
              <input type="email" placeholder="请输入微信号" />
              <label>院系</label>
              <input type="email" placeholder="请输入院系" />
              <label>专业</label>
              <input type="email" placeholder="请输入专业" />
              <label>获奖记录</label>
              <input type="email" placeholder="请输入获奖记录" />
              <label>主修课程</label>
              <input type="email" placeholder="请输入主修课程" />
              <div className="input-group">
                <div className="input-item">
                  <label>GPA</label>
                  <input type="text" placeholder="" />
                </div>
                <div className="input-item">
                  <label>排名</label>
                  <input type="text" placeholder="" />
                </div>
              </div>
              {/* ... 其他表单元素 ... */}

              <div className="form-buttons">
                <button className='form-b' type="submit">保存</button>
                <button className='form-b' type="button"><a href='/fill-info-step4'>下一步</a></button>
              </div>
            </form>
          </div>
      </div>
      <div className='tip-info'>
            <div className="form-heading">
              <h2>小贴士</h2>
            </div>
            <div className='tip-context'>
              <p>
              <strong>为什么教育经历重要 ?</strong><br></br>
              - 证明资格：教育经历是求职者证明自己具备某个领域知识和技能的直接证据。对于刚从学校毕业或者具有相关学科背景的岗位申请者来说尤为重要。
              <br></br>
              - 展示潜力：对于经验较少的求职者，良好的教育背景可以突显其学习能力和成长潜力。
              <br></br>
              - 符合要求：某些岗位可能要求特定的学历背景，教育经历部分直接影响求职者的符合程度。
              </p>
              <p><strong>有哪些注意事项?</strong><br></br>
              - 简洁明了：即便是丰富的教育背景，也应尽量简洁地展示，避免不必要的细节，以免分散招聘官的注意力。
              <br></br>- 相关性：突出与求职岗位最相关的教育经历，如果有的话。比如，针对技术岗位强调你的理工科学位。
              <br></br>- 逆序排列：按时间逆序排列你的教育经历，即最近的学历/学位放在最前面。
              </p>
              <p>
              <strong>需要包括哪些内容要素?</strong><br></br>
              - 学校名称：清楚地列出学习机构的全名，不要用缩写代替。
              <br></br>- 学位和专业：明确指出所获得的学位以及专业领域。
              <br></br>- 成绩和荣誉：如有较高的GPA、奖学金或任何特殊荣誉，可以列出。
              <br></br>- 相关课程：如果适用，列出与求职岗位密切相关的课程（尤其是对于缺乏工作经验的应届毕业生）。
              </p>
            </div>
        </div>
      </div>
      <style jsx>{`
            p {
              margin: 20px 0; /* 调整段落的上下外边距 */
            }
      .background {
        background-color: #EDF8FD;
        min-height: 100vh;
        display: flex;
        flex-direction: row; /* 水平排列子元素 */
        flex-wrap: wrap; /* 允许子元素在必要时换行 */
        justify-content: center; /* 在主轴上居中对齐子元素 */
        align-items: flex-start; /* 在交叉轴上从顶部对齐子元素 */
      }

      .tip-info, .form-container {
        flex: 1 1 50%; /* 设置子元素基础大小为50%，允许它们增长和缩小 */
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        text-align: center;
        padding: 20px;
        box-sizing: border-box; /* 包括padding和border在内的宽度计算方式 */
      }
        .tip-info{
        }
        .tip-context{
        }
        .form-container {
          min-width:500px;
        }
        .form-heading h2,
        .form-description p {
          text-align: center;
        }
        .form-heading h2 {
          color: #1D80A7;
          font-weight:bold;
          font-size:40px;
        }
        .form-description{
          padding-bottom:20px;
        }
        .form-body form {
          display: flex;
          flex-direction: column;
          padding:0 100px;
        }
        .input-group {
          display: flex;
          justify-content: center;
          gap:100px;
          padding:10px;
        }
        .ps{
          color:grey;
          padding-bottom:10px;
        }
        .input-item {
        }
        .input-item:last-child {
        }
        label {
          margin-top: 10px;
          font-weight:bold;
          text-align: left;
        }
        input[type="title"],
        input[type="text"],
        input[type="tel"],
        input[type="email"] {
          padding: 10px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 10px;
        }
        .form-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .form-b {
          padding: 10px 50px;
          border: none;
          border-radius: 30px;
          color: white;
          background-color: #1D80A7; /* Bootstrap 蓝色按钮颜色 */
          cursor: pointer;
        }
        .form-b:hover {
          background-color: #B2DDEE;
          color:black;
        }
        .secondNavbar {
          display: flex;
          justify-content: space-around;
          padding: 20px 0;
          background-color: #B2DDEE;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        }
        .secondNavbar button {
          flex-grow: 1;
          padding: 10px 20px;
          border-radius: 15px;
          background: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color:black;
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
          color:white;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
          font-weight:bold;
        }
        .info-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px
          border-radius: 4px;
          margin: 10px 0;
          width:100%;
          max-width:800px;
          color:#1D80A7;
        }
        .info-text {
          font-weight:bold;
        }
        .info-button {
          display: flex;
          align-items: center;
          padding: 0 50px;
          border: #1D80A7 1px solid;
          border-radius: 4px;
          cursor: pointer;
        }
        .button-icon {
          margin-right: 8px;
          width: 50px; // 调整图标大小
          height: 50px; // 调整图标大小
        .secondNavbar {
          display: flex;
          justify-content: space-around;
          padding: 20px 0;
          background-color: #B2DDEE;
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
        }
        .secondNavbar button {
          flex-grow: 1;
          padding: 10px 20px;
          border-radius: 15px;
          background: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .secondNavbar button:hover, .secondNavbar button:focus {
          background-color: #1D80A7;
        }
        .secondNavbar .active {
          background-color: #1D80A7; /* 激活按钮的背景颜色 */
          color: white; /* 激活按钮的文本颜色 */
        }
      `}</style>
    </div>
  );
};

export default HomePage;



