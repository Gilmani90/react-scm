import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { CommonCodeCotext } from "../../../../../api/Provider/CommonCodeProvider";
import axios, { AxiosResponse } from "axios";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

interface ICommonCode {
    groupIdx: number;
    groupCode: string;
    groupName: string;
    useYn: string;
    createdDate: string;
    author: string;
    note: string;
}

interface ICommonCodeResponse {
    commonCode: ICommonCode[];
    commonCodeCnt: number;
}

export const CommonCodeMain = () => {
    const { searchKeyword } = useContext(CommonCodeCotext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>();

    useEffect(() => {
        searchCommonCode();
    }, [searchKeyword]);

    const searchCommonCode = (currentPage?: number) => {
        currentPage = currentPage | 1;
        axios
            .post("/management/commonCodeListBody.do", {
                ...searchKeyword,
                currentPage,
                pageSize: 5,
            })
            .then((res: AxiosResponse<ICommonCodeResponse>) => {
                setCommonCodeList(res.data.commonCode);
            });
    };

    return (
        <CommonCodeMainStyled>
            <table>
                <colgroup>
                    <col style={{ width: "5%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "10%" }} />
                    <col style={{ width: "8%" }} />
                    <col style={{ width: "5%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>그룹코드명</th>
                        <th>그룹코드설명</th>
                        <th>등록일</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {commonCodeList?.length > 0 ? (
                        commonCodeList.map((commonCode) => {
                            return (
                                <tr key={commonCode.groupIdx}>
                                    <td>{commonCode.groupIdx}</td>
                                    <td>{commonCode.groupCode}</td>
                                    <td>{commonCode.groupName}</td>
                                    <td>{commonCode.note}</td>
                                    <td>{commonCode.createdDate}</td>
                                    <td>{commonCode.useYn}</td>
                                    <td>
                                        <StyledButton>수정</StyledButton>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>조회 내역이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </CommonCodeMainStyled>
    );
};
