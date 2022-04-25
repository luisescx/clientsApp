export type AppStackParamsList = {
  PersonList: undefined;
  PersonForm: {
    person: Person;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamsList {}
  }
}
