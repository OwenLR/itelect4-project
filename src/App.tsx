import UserCard from "./components/UserCard";
import ItemCard from "./components/ItemCard";
import ClaimBadge from "./components/ClaimBadge";
import type { User, Item, Claim } from "./types/index";
import { ClaimStatus } from "./types/index";

const student: User = {
  id: 1, name: "Juan dela Cruz", email: "juan@example.com",
  role: "student", isActive: true,
};
const item: Item = {
  id: 1, title: "Black Backpack", description: "Left near the library entrance",
  location: "Main Library", datePosted: new Date(), type: "found",
};
const claim: Claim = {
  id: 1, itemId: 1, claimantId: 1,
  status: ClaimStatus.Pending, submittedAt: new Date(),
};

function App() {
  return (
    <div className="app">
      <UserCard user={student} onSelect={(u) => console.log(u)} />
      <ItemCard item={item} />
      <ClaimBadge claim={claim}>
        <p>Awaiting review</p>
      </ClaimBadge>
    </div>
  );
}

export default App;