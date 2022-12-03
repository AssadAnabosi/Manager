import styled from "styled-components";

export const LoadingContainer = styled.aside`
    position: fixed;
    z-index: 900;
    width: 100%;
    height: 100%;
    background: transparent;
    backdrop-filter: blur(20px);
    /* background: #0d0d0d; */
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: '100%';
    top: '0';
`

export const LoadingCenter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`