import React, { useState, useEffect, useContext, createContext } from 'react';
import bridge from '@vkontakte/vk-bridge';

import { View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol, Tabbar, TabbarItem, ModalRoot, ModalPage, Group, ModalPageHeader, PanelHeaderClose, SimpleCell, Snackbar } from '@vkontakte/vkui';

import { Icon28SearchLikeFilledOutline, Icon28HomeOutline, Icon28ArticleOutline, Icon28ChefHatOutline, Icon24ChevronCompactRight } from '@vkontakte/icons';
import '@vkontakte/vkui/dist/vkui.css';
import './style/App.scss';

import { ROUTES } from './ROUTES';
import { UserId } from './Context';
import Home from './panels/home/Home';
import Menu from './panels/menu/Menu';
import Liked from './panels/liked/Liked';
import Recipes from './panels/Recipes/Recipes';
import Recipe from './panels/recipe/Recipe';

import API from './api/AxiosConfig';
import Placeholder from './img/Loading.gif';

const App = () => {
	const [scheme, setScheme] = useState('bright_light')
	const [activePanel, setActivePanel] = useState(ROUTES.home);
	const [fetchedUser, setUser] = useState(null);
	
	const [popout, setPopout] = useState(<div className='app__spinner'><img src={Placeholder} /></div>);
	const [fetchedCategories, setCategories] = useState([]);
	const [activeCategory, setActiveCategory] = useState(1);

	const [mainPageDish, setMainPageDish] = useState(null);
	const [activeDish, setActiveDish] = useState(null);

	const [randomDishes, setRandomDishes] = useState(null);
	const [lastPanel, setLastPanel] = useState(ROUTES.home);



	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				setScheme(data.scheme)
			}
		});

		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			const categories = await API.get("/categories/list");
			const dish = (await API.get(`/dishes/${user.id}/list`)).data;
			setMainPageDish(dish[0, 1])
			setCategories(categories.data);
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);


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
					<ModalPageHeader left={<PanelHeaderClose onClick={hideModal} />}>
						Категории
					</ModalPageHeader>}
			>
				<Group>
					{
						fetchedCategories.map(category => (
							<SimpleCell key={category.id} onClick={() => { setActiveCategory(category.id); hideModal() }} after={<Icon24ChevronCompactRight />}>{category.name}</SimpleCell>
						))
					}
				</Group>
			</ModalPage>
		</ModalRoot>
	)
	
	const SetSnackBar = () => (
		setPopout(
		<Snackbar
			onClose={() => setPopout(null)}
			duration={3000}
			
		>
			Блюдо добавлено в список понравившихся
		</Snackbar>
		)
	)
	return (
		<ConfigProvider scheme={scheme} >
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout modal={ModalSearch} popout={popout}>
						<SplitCol>
							<UserId.Provider value={fetchedUser}>
								<View activePanel={activePanel}>
									<Home id={ROUTES.home}
										setActivePanel={setActivePanel}
										setActiveDish={setActiveDish}
										
										/>
									<Recipes id={ROUTES.recipes}
										setActivePanel={setActivePanel}
										setActiveDish={setActiveDish}
										openFilters={openFilters}
										activeCategory={activeCategory}
										setRandDishes = {setRandomDishes}
										randDishes = {randomDishes}

									/>
									<Menu id={ROUTES.menu} toggleSnackBar = {() => SetSnackBar()}/>
									<Liked id={ROUTES.liked}
										setActivePanel={setActivePanel}
										setActiveDish={setActiveDish}
									/>
									<Recipe
										id={ROUTES.recipe}
										setActivePanel={setActivePanel}
										dishID={activeDish}
										usr={fetchedUser}
										toggleSnackBar = {() => SetSnackBar()}
										lastPage = {lastPanel}
									/>
								</View>
							</UserId.Provider>
						</SplitCol>
						<Tabbar className='app__tabbar'>
							<TabbarItem text='Главная'
								selected={activePanel === ROUTES.home}
								onClick={() => {setActivePanel(ROUTES.home); setLastPanel(ROUTES.home) }}>
								<Icon28HomeOutline />
							</TabbarItem>
							<TabbarItem text='Рецептики'
								selected={activePanel === ROUTES.recipes}
								onClick={() => {setActivePanel(ROUTES.recipes); setLastPanel(ROUTES.recipes)}}>
								<Icon28ArticleOutline />
							</TabbarItem>
							<TabbarItem text='Меню'
								selected={activePanel === ROUTES.menu}
								onClick={() => {setActivePanel(ROUTES.menu); setLastPanel(ROUTES.menu)}}>
								<Icon28ChefHatOutline />
							</TabbarItem>
							<TabbarItem text='Понравилось'
								selected={activePanel === ROUTES.liked}
								onClick={() => {setActivePanel(ROUTES.liked); setLastPanel(ROUTES.liked)}}>
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
