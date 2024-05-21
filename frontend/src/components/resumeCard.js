import React ,{ useState,useEffect, useRef }from 'react';
import { useRouter } from 'next/router'; 

function ResumeBox({ resumeData}) {
    const router = useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef();

    const confirmDelete = () => {
        setShowConfirm(true);
    }

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (_id) => {
        // 使用写死的 ID 进行路由跳转
        router.push(`/fill-info-step10?${_id}`);
    };


    const handleDelete = (_id) => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/improved-users/${_id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Delete successful:', data);
            setShowConfirm(false); // 关闭确认框
        })
        .catch(error => {
            console.error('Delete error:', error);
        });
    }

    const handleDownloadPdf = (resumeHistoryId) => {
        const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL}/download-pdf/${resumeHistoryId}`;
    
        fetch(downloadUrl)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok.');
                return response.blob();
            })
            .then(blob => {
                // Create a local URL for the blob object
                const url = window.URL.createObjectURL(blob);
                // Create a new anchor element
                const a = document.createElement('a');
                a.href = url;
                a.download = "resume.pdf"; // Set the filename
                document.body.appendChild(a);
                a.click();
                
                // Cleanup
                a.remove();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => console.error('Download error:', error));
    };

    
   
    return (
        <>
        <div className="resumeBox">
            <div className="inner-div">
                <div className="resumeTitle">{resumeData.title}</div>
                <div className='textDetail'>{resumeData.details}</div>
            </div>
            <div className="inner-div">
                <div className="newActions">
                    <button className="actionButton">编辑</button>
                    <button className="actionButton" onClick={()=>{handleDownloadPdf('87c1fbdc-a883-48ce-9864-0cc2b1e34138')}}>下载PDF</button>
                </div>
            </div>
            <div className="menu-container">
                <img src="/img/more.svg" alt="更多" className="more-button" onClick={toggleMenu}/>
                {menuVisible && (
                    <div className="dropdown-menu" ref={menuRef}>
                        <ul>
                            <li>编辑</li>
                            <li onClick={()=>handleClick('f0c086b6-1c3b-4e87-b39e-39e7d4392b1b')}>预览</li>
                            <li onClick={confirmDelete}>删除</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>

        {showConfirm && (
            <div className="confirmOverlay">
                <div className="confirmContainer">
                    <p>是否确认删除简历？</p>
                    <div className="buttonGroup">
                        <button className="confirmButton" onClick={()=>handleDelete('f0c086b6-1c3b-4e87-b39e-39e7d4392b1b')}>删除</button>
                        <button className="cancelButton" onClick={() => setShowConfirm(false)}>取消</button>
                    </div>
                </div>
            </div>
        )}

        <style jsx>{`
        .resumeBox {
            position: relative;
            width: 320px;
            height: 400px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
            margin: 20px !important;
            padding:20px;
        }

        .newActions{
            display:flex;
            gap:20px;
            margin-left:15px
        }
        .textDetail{
            font-size:12px;
            color:#757575;
            padding: 50px;
        }

        .resumeTitle{
            font-size: 30px;
            font-weight: bold;
            padding: 50px;
        }
        .actionButton{
            width: 150px; 
            height: 50px; 
            font-size: 20px;
            font-weight: bold;
            background-color: #1D80A7;
            color: white;
            cursor: pointer;
            border-radius: 50px;
        }
        .menu-container {
            position: absolute;
            top: -170px;
            right: 18px;
            display: flex;
            align-items: center;
            height: 100%;
        }
        
        .more-button {
            cursor: pointer;
            width: 20px; 
            height: 20px;
        }
        
        .dropdown-menu {
            display: block;
            width: 150px; /* 宽度和外部菜单宽度一致 */
            position: absolute;
            right: 0;
            background-color: white;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateY(30%);
        }
        
        .dropdown-menu ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
            width: 100%; /* 让 ul 元素使用全部宽度 */
        }
        
        .dropdown-menu ul li {
            padding: 8px 16px;
            text-align: center; /* 文本居中对齐 */
            cursor: pointer;
            width: 100%; /* 确保 li 元素填充整个宽度 */
        }
        
        .dropdown-menu ul li:hover {
            background-color: #f1f1f1;
        }

        .confirmOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
        }
        .confirmContainer {
            width: 300px;
            padding: 20px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .buttonGroup {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }
        .confirmButton {
            width: 100px;
            height: 40px;
            background-color: #ff4d4f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .cancelButton {
            width: 100px;
            height: 40px;
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        p {
            font-size: 16px;
            color: #333;
        }
        `}</style>
        </>
    );
}

export default ResumeBox;
