import { CommonCodeProvider } from "../../api/Provider/CommonCodeProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { CommonCodeMain } from "../../components/page/Management/CommonCode/CommonCodeMain/CommonCodeMain";
import { CommonCodeSearch } from "../../components/page/Management/CommonCode/CommonCodeSearch/CommonCodeSearch";
import React, { createContext, FC, useState } from "react";

// //다른 컴포넌트에서 사용이 가능한 context를 만든다.
// export const CommonCodeCotext = createContext<object>({});

// // 만들어진 context를 컴포넌트에 전달할 provider를 만든다.
// export const CommonCodeProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
//     const [searchKeyword, setSearchKeyword] = useState({});
//     return (
//         <CommonCodeCotext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</CommonCodeCotext.Provider>
//     );
// };

export const CommonCode = () => {
    return (
        <CommonCodeProvider>
            <ContentBox variant='primary' fontSize='large'>
                공통코드관리
            </ContentBox>
            <CommonCodeSearch />
            <CommonCodeMain />
        </CommonCodeProvider>
    );
};
