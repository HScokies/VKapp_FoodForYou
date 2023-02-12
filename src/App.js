import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28SearchLikeFilledOutline, Icon28HomeOutline, Icon28ArticleOutline, Icon28ChefHatOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import './style/App.scss';
import Recipes from './panels/Recipes/Recipes';

import { ROUTES } from './ROUTES';
import Home from './panels/home/Home';
import Persik from './panels/Persik';
import Menu from './panels/menu/Menu';



const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState(ROUTES.home);
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [simple, setSimple] = useState('one');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<ConfigProvider scheme={scheme}>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id={ROUTES.home} fetchedUser={fetchedUser} go={go} />
								<Persik id={ROUTES.persik} go={go} />
								<Recipes id={ROUTES.recipes}/>
								<Menu id={ROUTES.menu} />
							</View>
						</SplitCol>
						<Tabbar className='app__tabbar'>
							<TabbarItem text='Главная'  onClick={go} data-to={ROUTES.home} >
								<Icon28HomeOutline />
							</TabbarItem>
							<TabbarItem text='Категории'  onClick={go} data-to={ROUTES.recipes}>
								<Icon28ArticleOutline />	
							</TabbarItem>
							<TabbarItem text='Меню' onClick={go} data-to={ROUTES.menu}>
								<Icon28ChefHatOutline />
							</TabbarItem>
							<TabbarItem text='Любимое' onClick={go} data-to={ROUTES.persik}>
								<Icon28SearchLikeFilledOutline />
							</TabbarItem>
						</Tabbar>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
