import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem, ModalRoot, ModalPage, Group, ModalPageHeader, PanelHeaderClose, SimpleCell} from '@vkontakte/vkui';

import { Icon28SearchLikeFilledOutline, Icon28HomeOutline, Icon28ArticleOutline, Icon28ChefHatOutline, Icon24DismissDark, Icon24ChevronCompactRight } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import './style/App.scss';

import { ROUTES } from './ROUTES';
import Home from './panels/home/Home';
import Persik from './panels/Persik';
import Menu from './panels/menu/Menu';
import Liked from './panels/liked/Liked';
import Recipes from './panels/Recipes/Recipes';
import Recipe from './panels/recipe/Recipe';



const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState(ROUTES.home);
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

	const [activeModal, setActiveModal] = useState(null);

	const openFilters = () => {
		setActiveModal(ROUTES.filters);
	}

	const hideModal = () => {
		setActiveModal(null);
	}

	const ModalSearch = (
		<ModalRoot activeModal={activeModal}>
			<ModalPage
			id={ROUTES.filters}
			onClose={hideModal}
			header={
			<ModalPageHeader left={<PanelHeaderClose onClick={hideModal}/>}>
				Фильтры
			  </ModalPageHeader>}
			>
				<Group>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Любая категория</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Завтраки</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Закуски</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Основные блюда</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Салаты</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Супы</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Сэндвичи</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Выпечка и десерты</SimpleCell>
					<SimpleCell after={<Icon24ChevronCompactRight />}>Соусы и маринады</SimpleCell>
				</Group>
			</ModalPage>
		</ModalRoot>
	)

	return (
		<ConfigProvider scheme={scheme} >
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout modal={ModalSearch} popout={popout}>
						<SplitCol>
							<View activePanel={activePanel}>
								<Home id={ROUTES.home} fetchedUser={fetchedUser} go={go} />
								<Persik id={ROUTES.persik} go={go} />
								<Recipes id={ROUTES.recipes} go={go} openFilters={openFilters} />
								<Menu id={ROUTES.menu} />
								<Liked id={ROUTES.liked} go={go} />
								<Recipe id='recipe' go={go}
									title='Яичница'
									time='Время приготовления составляет 5 минут'
									ingredients={`Яйца Соль ${"\n"} Перец (по вкусу)`}
									preparation='Разбейте яйца на разогретую сковородку и пожарьте их'
								/>
							</View>
						</SplitCol>
						<Tabbar className='app__tabbar'>
							<TabbarItem text='Главная' 
							selected={activePanel === ROUTES.home}
							onClick={go} 
							data-to={ROUTES.home} >
								<Icon28HomeOutline />
							</TabbarItem>
							<TabbarItem text='Категории'  
							selected={activePanel === ROUTES.recipes}
							onClick={go} 
							data-to={ROUTES.recipes}>
								<Icon28ArticleOutline />	
							</TabbarItem>
							<TabbarItem text='Меню' 
							selected={activePanel === ROUTES.menu}
							onClick={go} 
							data-to={ROUTES.menu}>
								<Icon28ChefHatOutline />
							</TabbarItem>
							<TabbarItem text='Понравилось' 
							selected={activePanel === ROUTES.liked}
							onClick={go} 
							data-to={ROUTES.liked}>
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
