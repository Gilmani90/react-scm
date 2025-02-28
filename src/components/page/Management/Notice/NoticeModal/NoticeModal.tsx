import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { INotice } from "../NoticeMain/NoticeMain";

interface InoticeModalProps {
    noticeId: number;
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

interface INoticeDetail extends INotice {
    fileName: string | null;
    fileExt: string | null;
    fileSize: number;
    physicalPath: string | null;
    logicalPath: string | null;
}

interface INoticeDetailResponse {
    detailValue: INoticeDetail;
}

interface IPostResponse {
    result: "success" | "fail";
}

export const NoticeModal: FC<InoticeModalProps> = ({ noticeId, setNoticeId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const fomrRef = useRef<HTMLFormElement>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>(null);

    useEffect(() => {
        noticeId && searchDetail();

        return () => {
            setNoticeId(0);
        };
    }, []);

    const searchDetail = () => {
        axios
            .post("/management/noticeFileDetailJson.do", { noticeId })
            .then((res: AxiosResponse<INoticeDetailResponse>) => {
                setDetail(res.data.detailValue);
                const { fileExt, logicalPath } = res.data.detailValue;
                if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                    setImageUrl(logicalPath);
                } else {
                    setImageUrl("");
                }
            });
    };

    const saveNotice = () => {
        //form은 키와 밸류로 구성되어 spring에서 requestParam으로 받을 수 있다. 다순 json은 requestbody로 받아야 함
        axios.post("/management/noticeSave.do", fomrRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다");
                postSuccess();
            }
        });
    };

    const saveNoticeFile = () => {
        //form은 키와 밸류로 구성되어 spring에서 requestParam으로 받을 수 있다. 다순 json은 requestbody로 받아야 함
        axios.post("/management/noticeFileSave.do", fomrRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다");
                postSuccess();
            }
        });
    };

    const updateNotice = () => {
        const formData = new FormData(fomrRef.current);
        formData.append("noticeId", noticeId.toString());
        axios.post("/management/noticeUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            alert("수정되었습니다.");
            postSuccess();
        });
    };
    const updateNoticeFile = () => {
        const formData = new FormData(fomrRef.current);
        formData.append("noticeId", noticeId.toString());
        axios.post("/management/noticeFileUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            alert("수정되었습니다.");
            postSuccess();
        });
    };

    const deleteNotice = () => {
        axios.post("/management/noticeDeleteJson.do", { noticeId }).then((res: AxiosResponse<IPostResponse>) => {
            alert("삭제되었습니다.");
            postSuccess();
        });
    };
    const deleteNoticeFile = () => {
        axios.post("/management/noticeFileDeleteJson.do", { noticeId }).then((res: AxiosResponse<IPostResponse>) => {
            alert("삭제되었습니다.");
            postSuccess();
        });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileSplit = fileInfo[0].name.split(".");
            const fileExt = fileSplit[1].toLowerCase();

            if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }
            setFileName(fileInfo[0].name);
        }
    };

    const filedDownload = () => {
        const param = new URLSearchParams();
        param.append("noticeId", noticeId.toString());

        axios
            .post("/management/noticeDownload.do", param, { responseType: "blob" })
            .then((res: AxiosResponse<Blob>) => {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", detail?.fileName as string);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            });
    };

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={fomrRef}>
                    <label>
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.title}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.content}></StyledInput>
                    </label>
                    파일 :
                    <StyledInput
                        type='file'
                        id='fileInput'
                        style={{ display: "none" }}
                        name='file'
                        onChange={handlerFile}
                    ></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div onClick={filedDownload}>
                        {imageUrl ? (
                            <div>
                                <label>미리보기</label>
                                <img src={imageUrl}></img>
                                {fileName || detail.fileName}
                            </div>
                        ) : (
                            <div>{fileName}</div>
                        )}
                    </div>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={noticeId ? updateNoticeFile : saveNoticeFile}>
                            {noticeId ? "수정" : "저장"}
                        </StyledButton>
                        {!!noticeId && (
                            <StyledButton type='button' onClick={deleteNoticeFile}>
                                삭제
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
