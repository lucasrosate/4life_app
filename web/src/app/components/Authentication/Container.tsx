import styled from 'styled-components';


const swipeLength = "80px";

const Container = styled.div<{width: string, height: string}>`
background-color: #fafafa;
width: ${props => props.width};
height: ${props => props.height};
padding: 30px 60px;
border-radius: 8px;

overflow: hidden;

.swipe-right-enter {
    opacity: 0.01;
    transform: translateX(-${swipeLength});
}

.swipe-right-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity 300ms, transform 400ms;
}

.swipe-right-exit {
    opacity: 1;
    transform: translateX(0px);
}

.swipe-right-exit-active {
    opacity: 0.01;
    transform: translateX(-${swipeLength});
    transition: opacity 300ms, transform 400ms;
}



.swipe-left-enter {
    opacity: 0.01;
    transform: translateX(${swipeLength});
}

.swipe-left-enter-active {
    opacity: 1;
    transform: translateX(0px);
    transition: opacity 300ms, transform 400ms;
}

.swipe-left-exit {
    opacity: 1;
    transform: translateX(0px);
}

.swipe-left-exit-active {
    opacity: 0.01;
    transform: translateX(${swipeLength});
    transition: opacity 300ms, transform 400ms;
}

`

export default Container;