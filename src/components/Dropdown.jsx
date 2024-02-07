import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export default function Dropdown({
  title,
  handleManualClick,
  handlePriceAscClick,
  handlePriceDescClick,
  handleCreateAscClick,
  handleCreateDescClick
}) {
  const menuItems = [
    { label: 'Manual', onClick: handleManualClick },
    { label: 'Price ascending', onClick: handlePriceAscClick },
    { label: 'Price descending', onClick: handlePriceDescClick },
    { label: 'Created ascending', onClick: handleCreateAscClick },
    { label: 'Created descending', onClick: handleCreateDescClick },
  ];

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-black">
            {title}
            <img 
              src='/svg/menu/dropdown-menu_down-arrow.svg'
              className="w-auto h-4 ml-1"
              alt="dropdown menu"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {menuItems.map((item, index) => (
                <Menu.Item key={index}>
                  <button 
                    onClick={item.onClick}
                    className='px-2 py-2 text-sm flex w-full font-semibold hover:underline'>
                    {item.label}
                  </button>
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
