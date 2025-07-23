import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Array "mo:base/Array"; // ✅ REQUIRED

actor ContentManager {


  type ContentEntry = {
    id         : Nat;
    owner      : Principal;
    prompt     : Text;
    contentType: Text;
    tone       : Text;
    cid        : Text;
    createdAt  : Time.Time;
  };

  stable var entries : [ContentEntry] = [];

  public shared(msg) func createContent(
    prompt     : Text,
    contentType: Text,
    tone       : Text,
    cid        : Text
  ) : async Nat {
    let id = entries.size();
    let entry = {
      id;
      owner = msg.caller;
      prompt;
      contentType;
      tone;
      cid;
      createdAt = Time.now();
    };
    entries := Array.append(entries, [entry]);
    return id;
  };

public query func generateContent(
  prompt: Text,
  platform: Text,
  contentType: Text,
  tone: Text
): async Text {
  return "Generated content for: '" # prompt # "' [" # platform # ", " # contentType # ", " # tone # "]";
};


  public query func getContent(id : Nat) : async ?ContentEntry {
    if (id < entries.size()) {
      return ?entries[id];
    };
    return null;
  };

  public query func listByOwner(owner: Principal) : async [ContentEntry] {
    Array.filter<ContentEntry>(entries, func(e) { e.owner == owner });
  };
};
