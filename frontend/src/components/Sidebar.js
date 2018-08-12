import React from 'react';
import { SidebarWrapper } from './Styled';

const Sidebar = ({ categories }) => {
  return (
    <SidebarWrapper>
      <h1>Title</h1>
      <h3>Categories</h3>
      <ul>
        {categories.map(cat => (
          <li>
            <a href={cat.path}>{cat.name}</a>
          </li>
        ))}
      </ul>
    </SidebarWrapper>
  );
};

export default Sidebar;
