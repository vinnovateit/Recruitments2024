import React from 'react';

interface NavBarProps {
    color: string;
    textColor: string;
}

const NavBar: React.FC<NavBarProps> = ({ color, textColor }) => {
    return (
        <section style={{ backgroundColor: color, color: textColor, fontFamily: 'Fixture, sans-serif' }} className='font-Righteous py-[0.5rem] fixed min-w-full'>
            <nav className='flex justify-between ml-9'>
                <ul className='flex gap-10 items-center mr-10' style={{ margin: '0 auto' }}>
                    <li className='cursor-pointer'><a>Home</a></li>
                    <li className='cursor-pointer'><a>About Us</a></li>
                    <li className='cursor-pointer'><a>Domains</a></li>
                    <li className='cursor-pointer'><a>Community</a></li>
                    <li style={{ backgroundColor: textColor, color: color }}>
                    <button className='px-4 cursor-pointer rounded-full'>
                            <a>Login</a>
                        </button>
                    </li>
                </ul>
            </nav>
        </section>
    );
}

export default NavBar;