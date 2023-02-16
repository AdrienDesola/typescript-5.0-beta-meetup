/*
 * Example only work in vsCode
 */
const routes = <T> (routes: T[]) => {
  const addRedirect = (from: T, to: T) => {
    // do stuff
  }
  return {
    addRedirect
  }
}

const router = routes(['/users', '/posts', '/admin/users'])

router.addRedirect('/users', '/posts')
router.addRedirect('/users', '/a/non/valid/route')

/*
 *  Enum
 */

enum State {
  active,
  deleted,
  disabled,
}

function setState (state: State) {

}

setState(0)
setState(State.deleted)
setState(3)
