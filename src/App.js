import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon12Add, Icon20ArticleBoxOutline, Icon28HomeOutline, Icon28ArticleOutline } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import './App.scss';
import Recipes from './panels/Recipes/Recipes';

import Home from './panels/home/Home';
import Persik from './panels/Persik';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

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
								<Home id='home' fetchedUser={fetchedUser} go={go} />
								<Persik id='persik' go={go} />
								<Recipes id='recipes'/>
							</View>
						</SplitCol>
						<Tabbar className='app__tabbar'>
							<TabbarItem text='Главная'  onClick={go} data-to="home">
								<Icon28HomeOutline />
							</TabbarItem>
							<TabbarItem text='Категории'  onClick={go} data-to="persik">
								<Icon28ArticleOutline />	
							</TabbarItem>
							<TabbarItem text='Меню' onClick={go} data-to="recipes">

							</TabbarItem>
						</Tabbar>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
