import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useAppSelector} from "../common/hooks/useAppSelector";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>;

const TaskContainer = () => {
    const task = useAppSelector(storyBookStore => storyBookStore.tasks['todolistId1'][0])
    return <Task task={task} todolistId={'todolistId1'}/>
}

const Template: ComponentStory<typeof Task> = () =>
    <TaskContainer />;

export const TaskStory = Template.bind({});
TaskStory.args = {};

