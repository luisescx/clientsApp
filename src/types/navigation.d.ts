export type AppStackParamsList = {
  PersonList: undefined;
  PersonForm: {
    person: Person;
    isCreatePerson: boolean;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}
