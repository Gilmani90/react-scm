import React, { createContext, FC, useState } from "react";

// 초기값의 타입.
interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

//다른 컴포넌트에서 사용이 가능한 값을 만든다.
export const CommonCodeCotext = createContext<ISearchKeyword>({});

// 만들어진 값에 searchKeyword, setSearchKeyword을 넣어서 자식 노드에서 자유롭게 호출하게 한다.
export const CommonCodeProvider: FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState({});
    return (
        <CommonCodeCotext.Provider value={{ searchKeyword, setSearchKeyword }}>{children}</CommonCodeCotext.Provider>
    );
};
