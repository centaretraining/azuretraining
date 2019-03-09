import React from 'react';
import { Menu, MealTime } from './entities';
import MenuList from './menuList';
import MenuForm from './menu-form';
//import * as service  from './menu-service';

interface Props {

}

interface State {
    menus: Menu[];
    menuIsLoading: boolean;
    menuIsSaving: boolean;
    menuIsEditing: boolean;
}

class MenuPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            menus: [],
            menuIsLoading: true,
            menuIsSaving: false,
            menuIsEditing: false
        };
    }

    componentDidMount(){
        const menus = [
            {
                Id:1,
                MenuName: "Weekday Lunch",
                Meal: MealTime.Lunch,
                Start: new Date(),
                End: new Date(),
                Items: [ {Id:1, Name: "Taco", Price: 5.01}, {Id:2, Name: "Salad", Price: 6.05}]
            } as Menu,
            {
                Id:2,
                MenuName: "Weekday Diner",
                Meal: MealTime.Dinner,
                Start: new Date(),
                End: new Date(),
                Items: [ {Id:1, Name: "Taco", Price: 6.01}, {Id:2, Name: "Salad", Price: 7.05}]
            } as Menu
        ]
        this.setState({menus});
    }

    // async componentDidMount(){
    //     const menus = await service.getMenus();
    //     this.setState({menus});
    // }

    render(){
        return (
            <div>
                <MenuList menus={this.state.menus} />
                <MenuForm />
            </div>
        );
    }
}

export default MenuPage;
