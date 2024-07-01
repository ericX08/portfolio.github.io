import React from "react";
import { Html } from "@react-three/drei";
import { load } from "../../public";

const Loader = () => {
    return (
        <Html fullscreen>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#7300E9',
            }}>
                <img src={load} alt="Loading..." />
            </div>
        </Html>
    );
}

export default Loader;