const index: React.FC<any> = () => {
  return (
    <div>
      <h1>Badges</h1>

      <blockquote className="badgr-badge" style={{ fontFamily: "Helvetica, Roboto, &quot;Segoe UI&quot;, Calibri, sans-serif;" }}>
        <a href="https://api.badgr.io/public/assertions/bmDzG5jlQ0233Vm5uX7osA?identity__email=alvarivan88%40gmail.com"><img src="https://images.credly.com/images/4dd00b35-94ff-48f3-9c75-7f438c72a3f9/6b8ce00dd356436eaac22f9efcfde552-01.png" width="120px" height="120px" /></a><p className="badgr-badge-name" style={{hyphens: "auto", overflowWrap: "break-word", wordWrap: "break-word", margin: "0", fontSize: "16px", fontWeight: "600", fontStyle: "normal", fontStretch: "normal", lineHeight: "1.25", letterSpacing: "normal", textAlign: "left", color: "#05012c"}}>JavaScript - Advanced</p>
        
        <p className="badgr-badge-date" style={{margin: "0", fontSize: "12px", fontStyle: "normal", fontStretch: "normal", lineHeight: "1.67", letterSpacing: "normal", textAlign: "left", color: "#555555"}}>
          <strong style={{fontSize: "12px", fontWeight: "bold", fontStyle: "normal", fontStretch: "normal", lineHeight: "1.67", letterSpacing: "normal", textAlign: "left", color: "#000"}}>Awarded: </strong>Jun 5, 2022
        </p>
          
        <p style={{margin: "16px 0", padding: "0"}}>
          <a className="badgr-badge-verify" target="_blank" href="https://badgecheck.io?url=https%3A%2F%2Fapi.badgr.io%2Fpublic%2Fassertions%2FbmDzG5jlQ0233Vm5uX7osA%3Fidentity__email%3Dalvarivan88%2540gmail.com&amp;identity__email=alvarivan88%40gmail.com" style={{boxSizing: "content-box", display: "flex", alignItems: "center", justifyContent: "center", margin: "0", fontSize: "14px", fontWeight: "bold", width: "48px", height: "16px", borderRadius: "4px", border: "solid 1px black", textDecoration: "none", padding: "6px 16px, margin: 16px 0", color: "black"}}>VERIFY</a>
        </p>
        
        <script async={true} src="https://badgr.com/assets/widgets.bundle.js"></script>
      </blockquote>
    </div>
  )
}

// somehow embed badges from badgr
// https://badgr.com/backpack/badges?tab=Basic

export default index