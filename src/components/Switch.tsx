// import React from 'react';

// interface SwitchProps {
//     onChange: () => void;
//     checked: boolean;
// }

// const Switch: React.FC<SwitchProps> = ({ onChange, checked }) => {
//     return (
//         <label className="relative inline-flex items-center cursor-pointer">
//             <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
//             <div className="w-11 h-6 bg-gray-200 rounded-full peer transition duration-200 ease-in-out">
//                 <span className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out ${checked ? 'translate-x-full bg-blue-600' : ''}`}></span>
//             </div>
//         </label>
//     );
// };

// export default Switch; 