export default () => {
    try {
      const serializedState = localStorage.getItem('state');
    //   console.log("in loadState ");
    //   console.log(JSON.parse(serializedState));
      if(serializedState === null) {
        return null;
      }
      return JSON.parse(serializedState);
    } catch (e) {
        return "error in loadState";
    }
}
